namespace ecommerces4.Models
{
    public class Product
    {
        public int Id {get; set;}
        public string product_name { get; set;}
        public string product_image { get; set;}
        public string product_description { get; set;}
        public int product_price { get; set;}
        public string category { get; set; }
    } 
}
