using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace ServiceWebsite
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseKestrel(c => c.AddServerHeader = false)
                .UseStartup<Startup>();
        }
    }
}