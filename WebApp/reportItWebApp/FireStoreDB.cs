using System.Text.Json;
using System.Text.Json.Serialization;
using System.Net.Http.Json;

namespace reportItWebApp
{
    public sealed class FireStoreDB
    {
        private static FireStoreDB s_Instance;
        private readonly HttpClient r_HttpClient;

        private FireStoreDB()
        {
            r_HttpClient = new HttpClient();
            r_HttpClient.BaseAddress = new Uri("http://localhost:3000/");
        }

        public static FireStoreDB Instance
        {
            get
            {
                s_Instance ??= new FireStoreDB();

                return s_Instance;
            }
        }

        public async Task<User> GetUserByEmailAsync(string i_Email)
        {
            User userJson = await r_HttpClient.GetFromJsonAsync<User>($"users/{i_Email}");

            return userJson;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            List<User> allUsers = await r_HttpClient.GetFromJsonAsync<List<User>>("users");

            return allUsers;
        }

        public async Task<List<Report>> GetAllReportsAsync()
        {
            HttpResponseMessage response = await r_HttpClient.GetAsync("reports");
            //PrintResponse(response);
            List<Report> allReports = await response.Content.ReadFromJsonAsync<List<Report>>();

            return allReports;
        }

        public async Task<bool> UpdateReportAsync(Report i_Report)
        {
            HttpResponseMessage response = await r_HttpClient.PutAsJsonAsync($"reports/{i_Report.ID}", i_Report);

            return response.IsSuccessStatusCode;
        }

        public async Task<bool> PostUserAsync(User i_NewUser)
        {
            HttpResponseMessage response = await r_HttpClient.PostAsJsonAsync("users", i_NewUser);

            return response.IsSuccessStatusCode;
        }

        public async Task<bool> DeleteUserAsync(string i_Email)
        {
            HttpResponseMessage response = await r_HttpClient.DeleteAsync($"users/{i_Email}");

            return response.IsSuccessStatusCode;
        }

        /*private async static void PrintResponse(HttpResponseMessage i_Response)
        {
            string jsonResponse = await i_Response.Content.ReadAsStringAsync();
            Console.WriteLine(jsonResponse);
        }*/
    }
}
