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
            string strRegex = @"(?<base>[A-Z]+(?:_[A-Z]+)+))";
            Regex regexObj = new Regex(strRegex, RegexOptions.Multiline);
            return regexObj.IsMatch(strRegex);
        }
    }
}
