# 發佈為公開網址

網站使用 GitHub Pages。只有 `llm-wiki-site` 這個資料夾的內容可以作為儲存庫根目錄上傳。私人目錄、原始 PDF、本機預覽服務與私人草稿都不在發佈範圍內。

## 使用分支發佈（目前選用）

`main` 保留 Astro 網站原始碼。`gh-pages` 只放已建置完成、通過公開內容檢查的網站檔案，入口是分支根目錄的 `index.html`。

在儲存庫 **Settings → Pages** 設定：

1. **Source**：`Deploy from a branch`。
2. **Branch**：`gh-pages`。
3. **Folder**：`/(root)`。
4. 點 **Save**。

建置成品包含 `.nojekyll`，讓 GitHub 直接提供 `_astro` 樣式、程式與字型檔案。之後修改內容仍須先審閱、重新建置，再更新 `gh-pages`；只更新 `main` 不會更新這個分支上的網站。

## 另一種方式：手動工作流程

1. 建立專用 GitHub 儲存庫。若使用 GitHub Free，GitHub Pages 的儲存庫需為 Public。
2. 上傳網站原始碼，讓 `package.json`、`astro.config.mjs`、`src` 和 `.github` 位於儲存庫最外層。
3. 在儲存庫 **Settings → Pages → Source** 選擇 **GitHub Actions**。
4. 在 **Actions → Publish LLM Wiki → Run workflow** 手動執行發佈。
5. 等待建置與發佈皆成功，從該次執行的 `github-pages` 環境開啟實際網址。只有成功後才代表網站已上線。

## 網址

一般專案儲存庫的網址為 `https://帳號.github.io/儲存庫名稱/`。名稱為 `帳號.github.io` 的特殊儲存庫使用網域根目錄。設定會從 GitHub 執行環境辨識帳號和儲存庫名稱；自訂網域另行設定 `SITE_URL`、`BASE_PATH`。

## 內容核准與發佈是兩個步驟

使用者已在 2026-11-13 明確核准 `hlm18`、`hly15`、`slice` 三份整理筆記；公開副本已設為 `public/reviewed` 並登錄清單。私人原稿保留在網站以外。未來文章仍須逐篇核准。原始 PDF 與私人註記沒有獲准公開，也沒有加入網站。

目前選用分支發佈，不必執行自訂 Publish LLM Wiki 工作流程。若未來改用 GitHub Actions 作為 Source，該工作流程才在手動點選 Run workflow 時執行。輸出的 `dist/` 才是發佈成品；本機私人預覽從來不會被打包。

## 官方說明

- [Astro 的 GitHub Pages 設定](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages 的發佈來源與方案](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
