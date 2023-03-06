using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace PrimeTech.api
{
    
    public class apItemController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage SaveUpdate(object[] data)
        {
            string result = "";
            try
            {

                vmPrime cmnParam = JsonConvert.DeserializeObject<vmPrime>(data[0].ToString());
                List<vmDetail> cmnDetail = JsonConvert.DeserializeObject<List<vmDetail>>(data[1].ToString());

                SqlConnection con = new SqlConnection(@"Data Source=DESKTOP-PAU4AHF;Initial Catalog=AngularUnit;Persist Security Info=True;User ID=sa;Password=1234");
                    SqlCommand cmd = new SqlCommand("sp_Insert", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("BillNo", cmnParam.BillNo);
                    cmd.Parameters.AddWithValue("Name", cmnParam.Name);
                    cmd.Parameters.AddWithValue("Address", cmnParam.Address);
                    cmd.Parameters.AddWithValue("Phone", cmnParam.Phone);
                    con.Open();
                    int k = cmd.ExecuteNonQuery();
                    con.Close();

                    foreach (vmDetail it in cmnDetail)
                    {
                        try
                        {
                            SqlConnection co = new SqlConnection(@"Data Source=DESKTOP-PAU4AHF;Initial Catalog=AngularUnit;Persist Security Info=True;User ID=sa;Password=1234");
                            SqlCommand cm = new SqlCommand("sp_InsertDetail", co);
                            cm.CommandType = CommandType.StoredProcedure;
                            cm.Parameters.AddWithValue("MasterID", cmnParam.BillNo);
                            cm.Parameters.AddWithValue("ItemName", it.ItemName.ToString());
                            cm.Parameters.AddWithValue("Quantity", it.Quantity.ToString());
                            cm.Parameters.AddWithValue("UnitPrice", it.UnitPrice.ToString());
                            cm.Parameters.AddWithValue("price", it.price.ToString());

                            co.Open();
                            k = cm.ExecuteNonQuery();
                            co.Close();
                        }
                        catch (Exception e)
                        {
                            e.ToString();
                            result = "Record Wasn't inserted";
                            return Request.CreateResponse(HttpStatusCode.OK, result);
                        }
                    }
                    if (k != 0)
                    {
                        result = "Record Inserted Succesfully into the Database";

                    }
                    //con.Close();
            }
            catch (Exception e)
            {
                e.ToString();
                result = "";
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpGet]

        public List<vmPrime> showData()
        {
            List<vmPrime> PrimeList = new List<vmPrime>();

            SqlConnection con = new SqlConnection(@"Data Source=DESKTOP-PAU4AHF;Initial Catalog=AngularUnit;Persist Security Info=True;User ID=sa;Password=1234");
            SqlCommand cmd = new SqlCommand("sp_ShowPrime", con);
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            SqlDataReader DataReader = cmd.ExecuteReader();
            while (DataReader.Read())
            {


                PrimeList.Add(new vmPrime
                {
                    BillNo = DataReader["BillNo"].ToString(),
                    Name = DataReader["Name"].ToString(),
                    Address = DataReader["Address"].ToString(),
                    Phone = DataReader["Phone"].ToString()
                });

            }
            return PrimeList;
        }


    }
}