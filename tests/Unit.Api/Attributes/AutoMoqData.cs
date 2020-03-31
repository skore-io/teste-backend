using AutoFixture;
using AutoFixture.AutoMoq;
using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Unit.Api.Attributes
{
    public class AutoMoqData : AutoDataAttribute
    {
        public AutoMoqData() : base(() =>
        {
            var fixture = new Fixture();
            fixture.Inject(new BindingInfo());
            fixture.Customize(new AutoMoqCustomization());
            return fixture;
        })
        {

        }
    }
}
