const vscode = require("vscode");

// UXKIN's MCP server: real UI references (read-only). VS Code asks the
// person to sign in with their UXKIN account the first time it's used.
const SERVER_URL = "https://uxkin.com/mcp";
const SERVER_LABEL = "UXKIN (SwiftUI App Design)";
const PROVIDER_ID = "swiftui-app-design.mcp";

function activate(context) {
  // VS Code: MCP server definition provider (stable API).
  if (vscode.lm && typeof vscode.lm.registerMcpServerDefinitionProvider === "function" && vscode.McpHttpServerDefinition) {
    const changed = new vscode.EventEmitter();
    context.subscriptions.push(
      changed,
      vscode.lm.registerMcpServerDefinitionProvider(PROVIDER_ID, {
        onDidChangeMcpServerDefinitions: changed.event,
        provideMcpServerDefinitions: () => [
          new vscode.McpHttpServerDefinition(SERVER_LABEL, vscode.Uri.parse(SERVER_URL), {}, "1.0.1")
        ]
      })
    );
    return;
  }
  // Cursor: its own extension API for MCP servers.
  const cursorMcp = vscode.cursor && vscode.cursor.mcp;
  if (cursorMcp && typeof cursorMcp.registerServer === "function") {
    const name = "uxkin-swiftui-app-design";
    cursorMcp.registerServer({ name, server: { url: SERVER_URL } });
    context.subscriptions.push({ dispose: () => cursorMcp.unregisterServer(name) });
  }
}

function deactivate() {}

module.exports = { activate, deactivate };
