# Video AI Studio - Agent Guidelines

Xem chi tiết quy chuẩn Vibe Coding & UI Standards tại [GEMINI.md](file:///d:/IT/DEMO/video-ai-demo/GEMINI.md).

## Quick Summary for Agents:
1. **Never allow full-screen window scrolling**: Main views must be `h-screen w-screen overflow-hidden`. Use internal scrollbars (`flex-1 min-h-0 overflow-y-auto`) for long lists.
2. **Prevent UI jumps & layout shifts**: Use Radix UI Tooltip Portals, fixed height/width containers, avoid hover scale that pushes siblings, use `font-mono` on counters, and apply `truncate min-w-0` on texts.
3. **Zero-typing UI pattern**: Use Radio buttons, Select dropdowns, and Switches instead of raw text inputs.
4. **Always set `cursor-pointer`** on all clickable/interactive elements.
5. **Enforce file size limits**: $\le 200$ lines target (max 300 lines). Commit using Conventional Commits.
