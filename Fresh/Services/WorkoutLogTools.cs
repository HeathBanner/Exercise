using System;
using Exercise.Models;

namespace Exercise.Services
{
    class WorkoutLogTools
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
                case "Thurday":
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
    }
}
