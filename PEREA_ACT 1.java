public class SystemInfo {

    public static void main(String[] args) {

        Runtime compRuntime = Runtime.getRuntime();
      
      System.out.println("===System Information===\n");

      System.out.println("Available Processors: "
                + compRuntime.availableProcessors() + "\n");

        System.out.println("Free Memory (bytes): "
                + compRuntime.freeMemory() + "\n");

        System.out.println("Total Memory (bytes): "
                + compRuntime.totalMemory() + "\n");

        System.out.println("Max Memory (bytes): "
                + compRuntime.maxMemory() + "\n");

        System.out.println("OS name: "
                + System.getProperty("os.name") + "\n");

        System.out.println("OS version: "
                + System.getProperty("os.version") + "\n");

        System.out.println("Java version: "
                + System.getProperty("java.version") + "\n");
    }
}