<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class IndianCitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            // Metros
            ['name' => 'Mumbai', 'status' => 1],
            ['name' => 'Delhi', 'status' => 1],
            ['name' => 'Bengaluru', 'status' => 1],
            ['name' => 'Chennai', 'status' => 1],
            ['name' => 'Kolkata', 'status' => 1],
            ['name' => 'Hyderabad', 'status' => 1],
            ['name' => 'Pune', 'status' => 1],
            ['name' => 'Ahmedabad', 'status' => 1],

            // Uttar Pradesh
            ['name' => 'Lucknow', 'status' => 1],
            ['name' => 'Kanpur', 'status' => 1],
            ['name' => 'Noida', 'status' => 1],
            ['name' => 'Greater Noida', 'status' => 1],
            ['name' => 'Ghaziabad', 'status' => 1],
            ['name' => 'Agra', 'status' => 1],
            ['name' => 'Mathura', 'status' => 1],
            ['name' => 'Meerut', 'status' => 1],
            ['name' => 'Bareilly', 'status' => 1],
            ['name' => 'Aligarh', 'status' => 1],

            // Maharashtra
            ['name' => 'Thane', 'status' => 1],
            ['name' => 'Nashik', 'status' => 1],
            ['name' => 'Nagpur', 'status' => 1],
            ['name' => 'Aurangabad', 'status' => 1],
            ['name' => 'Solapur', 'status' => 1],
            ['name' => 'Kolhapur', 'status' => 1],
            ['name' => 'Sangli', 'status' => 1],
            ['name' => 'Satara', 'status' => 1],

            // Rajasthan
            ['name' => 'Jaipur', 'status' => 1],
            ['name' => 'Jodhpur', 'status' => 1],
            ['name' => 'Udaipur', 'status' => 1],
            ['name' => 'Kota', 'status' => 1],
            ['name' => 'Ajmer', 'status' => 1],
            ['name' => 'Bikaner', 'status' => 1],
            ['name' => 'Alwar', 'status' => 1],

            // Gujarat
            ['name' => 'Surat', 'status' => 1],
            ['name' => 'Vadodara', 'status' => 1],
            ['name' => 'Rajkot', 'status' => 1],
            ['name' => 'Bhavnagar', 'status' => 1],
            ['name' => 'Jamnagar', 'status' => 1],

            // Karnataka
            ['name' => 'Mysuru', 'status' => 1],
            ['name' => 'Mangaluru', 'status' => 1],
            ['name' => 'Udupi', 'status' => 1],
            ['name' => 'Hubballi', 'status' => 1],
            ['name' => 'Belagavi', 'status' => 1],

            // Tamil Nadu
            ['name' => 'Coimbatore', 'status' => 1],
            ['name' => 'Madurai', 'status' => 1],
            ['name' => 'Salem', 'status' => 1],
            ['name' => 'Erode', 'status' => 1],
            ['name' => 'Tiruppur', 'status' => 1],
            ['name' => 'Trichy', 'status' => 1],
            ['name' => 'Tirunelveli', 'status' => 1],

            // Kerala
            ['name' => 'Kochi', 'status' => 1],
            ['name' => 'Thiruvananthapuram', 'status' => 1],
            ['name' => 'Kozhikode', 'status' => 1],
            ['name' => 'Thrissur', 'status' => 1],
            ['name' => 'Palakkad', 'status' => 1],

            // MP
            ['name' => 'Indore', 'status' => 1],
            ['name' => 'Bhopal', 'status' => 1],
            ['name' => 'Ujjain', 'status' => 1],
            ['name' => 'Gwalior', 'status' => 1],
            ['name' => 'Jabalpur', 'status' => 1],

            // Bihar
            ['name' => 'Patna', 'status' => 1],
            ['name' => 'Gaya', 'status' => 1],
            ['name' => 'Bhagalpur', 'status' => 1],

            // Jharkhand
            ['name' => 'Ranchi', 'status' => 1],
            ['name' => 'Jamshedpur', 'status' => 1],
            ['name' => 'Dhanbad', 'status' => 1],

            // Odisha
            ['name' => 'Bhubaneswar', 'status' => 1],
            ['name' => 'Cuttack', 'status' => 1],
            ['name' => 'Rourkela', 'status' => 1],

            // Assam
            ['name' => 'Guwahati', 'status' => 1],
            ['name' => 'Silchar', 'status' => 1],
            ['name' => 'Dibrugarh', 'status' => 1],

            // UTs
            ['name' => 'Chandigarh', 'status' => 1],
            ['name' => 'Puducherry', 'status' => 1],
            ['name' => 'Port Blair', 'status' => 1],
            ['name' => 'Panaji', 'status' => 1],
            ['name' => 'Daman', 'status' => 1],
            ['name' => 'Silvassa', 'status' => 1],
        ];

        DB::table('cities')->insert($cities);
    }
}
