import subprocess
import sys
import os
import socket
import psutil

def check_port_psutil(port):
    try:
        for conn in psutil.net_connections():
            if conn.laddr.port == port:
                return conn.pid
    except psutil.AccessDenied:
        print(f"無法訪問網絡連接信息，可能需要管理員權限。")
    except Exception as e:
        print(f"檢查端口時發生錯誤: {e}")
    return None

def list_jekyll_processes():
    jekyll_processes = []
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        try:
            if proc.info['name'] and 'jekyll' in proc.info['name'].lower():
                jekyll_processes.append(proc)
            elif proc.info['cmdline']:
                if any('jekyll' in cmd.lower() for cmd in proc.info['cmdline']):
                    jekyll_processes.append(proc)
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            continue
        except Exception as e:
            print(f"處理進程 {proc.pid} 時發生錯誤: {e}")
    return jekyll_processes

def kill_process(pid):
    try:
        process = psutil.Process(pid)
        process.terminate()
        print(f"已發送終止信號給進程 (PID: {pid})")
        return True
    except psutil.NoSuchProcess:
        print(f"找不到進程 (PID: {pid})")
    except psutil.AccessDenied:
        print(f"無權限終止進程 (PID: {pid})")
    except Exception as e:
        print(f"終止進程 (PID: {pid}) 時發生錯誤: {e}")
    return False

def main():
    port = 4000  # Jekyll 的預設端口
    print(f"正在檢查端口 {port}...")
    
    pid = check_port_psutil(port)
    if pid:
        print(f"發現佔用端口 {port} 的進程 (PID: {pid})")
        if kill_process(pid):
            print(f"端口 {port} 已清理完成")
        else:
            print("清理失敗。請嘗試手動終止進程")
    else:
        print(f"未找到佔用端口 {port} 的進程")
    
    print("\n嘗試列出所有 Jekyll 相關進程：")
    jekyll_processes = list_jekyll_processes()
    if jekyll_processes:
        for proc in jekyll_processes:
            print(f"PID: {proc.pid}, 名稱: {proc.name()}, 命令行: {' '.join(proc.cmdline())}")
        
        user_input = input("\n是否要終止這些 Jekyll 進程？(y/n): ")
        if user_input.lower() == 'y':
            for proc in jekyll_processes:
                if kill_process(proc.pid):
                    print(f"已終止進程 (PID: {proc.pid})")
                else:
                    print(f"無法終止進程 (PID: {proc.pid})")
    else:
        print("未找到 Jekyll 相關進程")
    
    # 添加手動輸入 PID 的選項
    user_input = input("\n是否要手動輸入 PID 來終止進程？(y/n): ")
    if user_input.lower() == 'y':
        pid_input = input("請輸入要終止的進程 PID: ")
        try:
            pid = int(pid_input)
            if kill_process(pid):
                print(f"已嘗試終止進程 (PID: {pid})")
            else:
                print(f"無法終止進程 (PID: {pid})")
        except ValueError:
            print("無效的 PID 輸入")

if __name__ == "__main__":
    if os.geteuid() != 0:
        print("警告：此腳本可能需要管理員權限才能執行某些操作")
        print("建議使用 'sudo python clean_jekyll_port.py' 運行此腳本")
    
    main()