using System;
using Exercise.Models;

namespace Exercise.Services
{
    public class WorkoutLogTools
    {
        public Week DaySelector(WeeklyStats week, string day, out Week newDay)
        {
            switch (day)
            {
                case "Sunday":
                    newDay = week.Sunday;
                    break;
                case "Monday":
                    newDay = week.Monday;
                    break;
                case "Tuesday":
                    newDay = week.Tuesday;
                    break;
                case "Wednesday":
                    newDay = week.Wednesday;
                    break;
                case "Thursday":
                    newDay = week.Thursday;
                    break;
                case "Friday":
                    newDay = week.Friday;
                    break;
                default:
                    newDay = week.Saturday;
                    break;
            }
            Console.WriteLine("\n\n\n {0} \n\n\n", day);

            return newDay;
        }

        public int DayDiff(int date, string day)
        {
            string[] Days = { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" };
            int diff = date - Array.FindIndex(Days, d => d == day);

            return diff;
        }

        public bool checkDate(LogDate body, LogDate query, int diff)
        {
            if (body.Year != query.Year) return true;
            else if (body.Month != query.Month) return true;
            else if (diff != query.Date) return true;

            return false;
        }
    }
}
