
using TechTalk.SpecFlow;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public sealed class CheckList
    {
        private readonly BrowserContext _checklistContext;
        public CheckList(BrowserContext checklistContext)
        {
            _checklistContext = checklistContext;
        }

        [BeforeScenario]
        public void BeforeScenario()
        {
            _checklistContext.Items.AddOrUpdate("Consent", false);
            _checklistContext.Items.AddOrUpdate("AbilityToTakePart", false);
            _checklistContext.Items.AddOrUpdate("ClientNeedInterpreter", false);
            _checklistContext.Items.AddOrUpdate("IsHearingSuitableForVideo", false);
            _checklistContext.Items.AddOrUpdate("AboutClient", false);
            _checklistContext.Items.AddOrUpdate("UseSameComputer", false);
            _checklistContext.Items.AddOrUpdate("SuitableRoom", false);
            _checklistContext.Items.AddOrUpdate("EquipmentPhone", false);
            _checklistContext.Items.AddOrUpdate("EquipmentInternet", false);
            _checklistContext.Items.AddOrUpdate("EquipmentLaptop", false);
            _checklistContext.Items.AddOrUpdate("EquipmentNone", false);
            _checklistContext.Items.AddOrUpdate("EquipmentComputerCamera", false);
            _checklistContext.Items.AddOrUpdate("CheckEquipment", " ");
        }
    }
}
