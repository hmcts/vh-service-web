namespace ServiceWebsite.AcceptanceTests.Hooks
{
    internal enum HooksSequence
    {
        ConfigHooks = 1,
        RegisterApisHooks = 2,
        HealthcheckHooks = 3,
        InitialiseBrowserHooks = 4,
        ConfigureDriverHooks = 5,
        ScenarioHooks = 6,
        SetTimeZone = 7,
        AllocateUsers = 8,
        RemoveDataHooks = 9,
        CreateHearing = 10,
        LogResultHooks = 11,
        TearDownBrowserHooks = 12
    }
}
