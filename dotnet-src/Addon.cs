using System.Runtime.InteropServices;
using Microsoft.JavaScript.NodeApi;

namespace AddonLibrary;

[JSExport]
public static class Addon
{
    private const int AF_INET = 2;          // IPv4
    private const int SOCK_STREAM = 1;      // TCP
    private const int IPPROTO_TCP = 6;      // TCP Protocol
    private const int SOL_SOCKET = 1;       // Socket level
    private const int SO_REUSEPORT = 15;    // SO_REUSEPORT

    [DllImport("libc", SetLastError = true)]
    private static extern int socket(int domain, int type, int protocol);

    [DllImport("libc", SetLastError = true)]
    private static extern int setsockopt(int socket, int level, int optname, ref int optval, uint optlen);

    [DllImport("libc", SetLastError = true)]
    private static extern int bind(int socket, ref sockaddr_in addr, uint addrlen);

    [StructLayout(LayoutKind.Sequential)]
    public struct sockaddr_in
    {
        public short sin_family;
        public ushort sin_port;
        public in_addr sin_addr;
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 8)]
        public byte[] sin_zero;
    }

    [StructLayout(LayoutKind.Explicit)]
    public struct in_addr
    {
        [FieldOffset(0)]
        public uint s_addr;
    }

    private static ushort htons(ushort hostshort)
    {
        return (ushort)((hostshort >> 8) | (hostshort << 8));
    }

    private const uint INADDR_ANY = 0x00000000;

    [JSExport("bindPort")]
    public static int BindPort(int port) {
        int fd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);

        if (fd < 0)
        {
            Console.WriteLine("Failed to create socket");
            return 0;
        }

        int optionValue = 1;
        int result = setsockopt(fd, SOL_SOCKET, SO_REUSEPORT, ref optionValue, sizeof(int));
        if (result < 0)
        {
            Console.WriteLine("Failed to set SO_REUSEPORT");
            return 0;
        }

        sockaddr_in addr = new sockaddr_in
        {
            sin_family = AF_INET,
            sin_port = htons((ushort)port),
            sin_addr = new in_addr { s_addr = INADDR_ANY },
            sin_zero = new byte[8]
        };

        result = bind(fd, ref addr, (uint)Marshal.SizeOf(addr));
        if (result < 0)
        {
            Console.WriteLine("Failed to bind socket");
            return 0;
        }

        Console.WriteLine($"Socket file descriptor: {fd}");
        return fd;
    }
}