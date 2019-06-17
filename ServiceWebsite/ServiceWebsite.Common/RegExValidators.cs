using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace ServiceWebsite.Common
{
    public static class RegExValidators
    {
        public static bool ValidateForCapsAndUnderscore(string key)
        {
            string strRegex = @"\b[A-Z]+(?:_[A-Z]+)+\b";

            Regex regex = new Regex(strRegex, RegexOptions.None);
            Match match = regex.Match(key);

           return match.Success;
        }
    }
}
