import { test, expect } from "bun:test";
const { isVisible } = require("./essay-visibility.js");

const at = (iso) => new Date(iso);

test("過去日期的文章顯示", () => {
  expect(isVisible("2026-06-01", at("2026-06-17T08:00:00Z"))).toBe(true);
});

test("當天日期的文章顯示", () => {
  expect(isVisible("2026-06-17", at("2026-06-17T08:00:00Z"))).toBe(true);
});

test("未來日期的文章隱藏", () => {
  expect(isVisible("2026-06-18", at("2026-06-17T08:00:00Z"))).toBe(false);
});

test("時區邊界：台灣已跨日（UTC 16:30 = 台灣次日 00:30）文章顯示", () => {
  expect(isVisible("2026-06-24", at("2026-06-23T16:30:00Z"))).toBe(true);
});

test("時區邊界：台灣尚未跨日（UTC 15:30 = 台灣當日 23:30）文章仍隱藏", () => {
  expect(isVisible("2026-06-24", at("2026-06-23T15:30:00Z"))).toBe(false);
});

test("空字串日期視為無排程、顯示", () => {
  expect(isVisible("", at("2026-06-17T08:00:00Z"))).toBe(true);
});

test("undefined 日期視為無排程、顯示", () => {
  expect(isVisible(undefined, at("2026-06-17T08:00:00Z"))).toBe(true);
});
