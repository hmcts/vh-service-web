namespace ServiceWebsite.AcceptanceTests.Hooks
{
    internal enum HooksSequence
    {
        CleanUpDriverInstances,
        ConfigHooks,
        RegisterApisHooks,
        HealthcheckHooks,
        InitialiseBrowserHooks,
        ConfigureDriverHooks,
        ScenarioHooks,
        SetTimeZone,
        AllocateUsers,
        RemoveDataHooks,
        CreateHearing,
        LogResultHooks,
        TearDownBrowserHooks
    }
}
