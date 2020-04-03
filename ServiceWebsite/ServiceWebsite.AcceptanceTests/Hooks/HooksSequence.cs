namespace ServiceWebsite.AcceptanceTests.Hooks
{
    internal enum HooksSequence
    {
        ConfigHooks = 1,
        RegisterApisHooks = 2,
        HealthcheckHooks = 3,
        InitialiseBrowserHooks = 4,
        ConfigureDriverHooks = 5,
        SetTimeZone = 6,
        RemoveDataHooks = 7,
        DataHooks = 8,
        LogResultHooks = 9,
        TearDownBrowserHooks = 10,
        StopEdgeChromiumServer = 11
    }
}
