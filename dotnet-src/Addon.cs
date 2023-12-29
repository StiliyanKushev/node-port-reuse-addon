using Microsoft.JavaScript.NodeApi;

namespace AddonLibrary;

[JSExport]
public static class Addon
{
    [JSExport("bindPort")]
    public static int BindPort(int port) {
        Console.WriteLine($"BindPort(): {port}");
        return 4;
    }
}