import React from 'react';

const Search = () => {
   return ( 
      <div className="Search">
         <h2>Search for Stations</h2>
         <section>
            <form>
               <fieldset>
                  <legend>ID</legend>
                  <label>Federal ID:</label>
                  <input type="text" />
                  <label>Department Name:</label>
                  <input type="text" />
               </fieldset>
               <fieldset>
                  <legend>Address</legend>
                  <label>Address 1:</label>
                  <input type="text" />
                  <label>Address 2:</label>
                  <input type="text" />
                  <label>City:</label>
                  <input type="text" />
                  <label>County:</label>
                  <input type="text" />
                  <label>State:</label>
                  <input type="text" />    
               </fieldset>
               <fieldset>
                  <legend>Department Profile</legend>
                  <label>Type:</label>
                  <select multiple>
                     <option value="career">Career</option>
                     <option value="volunteer">Volunteer</option>
                  </select>
                  <label>Address 2:</label>
                  <input type="text" />
                  <label>City:</label>
                  <input type="text" />
                  <label>County:</label>
                  <input type="text" />
                  <label>State:</label>
                  <input type="text" />    
               </fieldset>
            </form>
         </section>
      </div>
    );
}
 
export default Search;



// {
//   "_id": "5ee054bcfbb9c2ca4bad52cf",
//   "FDID": "19005",
//   "Fire dept name": "Alhambra Fire Department",
//   "HQ addr1": "301 N 1ST ST",
//   "HQ addr2": "",
//   "HQ city": "Alhambra",
//   "HQ state": "CA",
//   "HQ zip": "91801-2454",
//   "HQ phone": "626-570-5190",
//   "HQ fax": "626-457-8961",
//   "County": "Los Angeles County",
//   "Dept Type": "Mostly career",
//   "Organization Type": "Local (includes career, combination, and volunteer)",
//   "Website": "https://www.cityofalhambra.org/fire/mainar.htm",
//   "Number Of Stations": "4",
//   "Active Firefighters - Career": "80",
//   "Active Firefighters - Volunteer": "12",
//   "Active Firefighters - Paid per Call": "0",
//   "Non-Firefighting - Civilian": "9",
//   "Non-Firefighting - Volunteer": "0",
//   "Primary agency for emergency mgmt": "",
//   "Latitude": 34.097257,
//   "Longitude": -118.129606,
//   "Accuracy Score": 1,
//   "Accuracy Type": "range_interpolation"
// }