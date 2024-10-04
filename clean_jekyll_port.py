import subprocess
import sys
import os

def check_port(port):
    try:
        result = subprocess.run(['lsof', '-i', f':{port}'], capture_output=True, text=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError:
        print(f"檢查端口 {port} 時發生錯誤")
        return None

def kill_process(pid):
    try:
        subprocess.run(['kill', str(pid)], check=True)
        print(f"已終止進程 (PID: {pid})")
        return True
    except subprocess.CalledProcessError:
        print(f"無法終止進程 (PID: {pid})，可能需要管理員權限")
        return False

def main():
    port = 4000  # Jekyll 的預設端口
    print(f"正在檢查端口 {port}...")
    
    output = check_port(port)
    if output:
        lines = output.split('\n')
        if len(lines) > 1:  # 標題行 + 至少一個進程
            process_info = lines[1].split()
            if len(process_info) > 1:
                pid = process_info[1]
                print(f"發現佔用端口 {port} 的進程 (PID: {pid})")
                if kill_process(pid):
                    print(f"端口 {port} 已清理完成")
                else:
                    print("清理失敗。請嘗試使用管理員權限運行此腳本")
            else:
                print(f"無法解析進程信息")
        else:
            print(f"端口 {port} 未被佔用")
    else:
        print(f"無法檢查端口 {port} 的狀態")

if __name__ == "__main__":
    if sys.platform != "darwin" and sys.platform != "linux":
        print("此腳本僅支援 macOS 和 Linux 系統")
        sys.exit(1)
    
    if os.geteuid() != 0:
        print("警告：此腳本可能需要管理員權限才能終止進程")
        print("建議使用 'sudo python clean_jekyll_port.py' 運行此腳本")
    
    main()