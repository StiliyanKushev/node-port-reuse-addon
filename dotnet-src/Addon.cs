using Microsoft.JavaScript.NodeApi;

namespace AddonLibrary;

[JSExport]
public static class Addon
{
    [JSExport("printTestMessage")]
    public static int PrintTestMessage() {
        Console.WriteLine("PrintTestMessage(): Hello World.");
        return 4;
    }
}