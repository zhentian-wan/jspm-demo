# jspm-demo

# Install jspm

```bash
npm install jspm -g
```

# Install package by using jspm
```bash
jspm install --save lodash moment
```

#Run
```bash
jspm bundle-sfx --minify app
```
app: means app.js file, the entry file of your app


---------------

**** Iranian national ID validation, if such is required. There was some hinting that it might be.
GET <HOST>/v1/checkIdValidity?id="<idToBeChecked>"
Should return something like: {"validity":1} or {"validity":0} or if the Iran has some national service that can do it, then of course it could return all the person related information that are available from such service, name etc.
**** Available customer service languages
The UI specified that the customer has an option to pick from the available customer service languages, we need these from the back end.
GET <HOST>/v1/customerServiceLanguages/
Should likely return: {"languages":[{"name":[{"name_en":"language name in English"},{"name_fa":"language name in Farsi"...}],"id"="xxx"},...]}
**** Education options
Since the education options were also specified to us as a drop down, we need the options from the back end, in localized format
GET <HOST>/v1/educationOptions/
Should likely return: {"educationOptions":[{"name":[{"name_en":"degree name in English"},{"name_fa":"degree name in Farsi"...}],,"id"="xxx"},...]}
----------------
**** Available phone numbers, by type, containing desired sequence of numbers, wild cards in sequence
As the application is expected to provide the user a choice and even search for desirable phone numbers and some typing of those,
the front end will need an API to retrieve those. As the list of available numbers will likely be rather extensive, there should be 
limit and offset to the request, with defaults so they can be left out from the possibly verbose request.
GET <HOST>/v1/availablePhoneNumbers?numberSchemeId=”<identifierHere>”
should likely return: {['999 551','999 552',...,'999 5512']}
i.e. the default limit is 12 (derived from the UI prototype) and the offset is 0, in a good API both can be specified explicitly as well,
so the UI can take the next block with offset 11 to keep consistent with how these behave in SQL where we are nicking them from.
The requirements have also something about searching for a certain kind of number and that needs to be addressed at the API as well. 
GET <HOST>/v1/availablePhoneNumbers?pattern="<filteringPattern>", numberSchemeId=”<identifierHere>”
where the filtering pattern can contain numbers, asterisk ('*') and underscore ('_') of which asterisk matches any sequence of numbers and underscore matches one number.
The numbers in sequence can appear at any position of the phone number. So if the pattern was "55" it would match all of the above example, if "551" first and last and if "552" only the second one would be returned "*2" would return second and last and so forth ad nauseam.
If the client as it seems has numbers categorized somehow, then the available numbers API endpoint needs to be able to filter by type, but this is likely a matter for the further development of the system.
This API will likely be developed with the functionality to reserve a number from the available set, either for a short period (minutes) to guarantee the good UX or for longer period (because customer’s particular requirements) but at this stage, let’s begin with the GET part of the endpoint
**** Reserved number by code
The system seems to require a  functionality, that customers can reserve a particular phone number in advance and get it from the systems with a code. For this purpose we need an API endpoint
GET <HOST>/v1/reservedNumbers?code="<code>"
should likely return something like: {"phoneNumber":"XXXXXXXXXX"}
As we want the order to succeed we want to reserved the number the user selected for the duration of the process For this reason we want the following API endpoint
POST <HOST>/v1/reservedNumbers?number="<number>"
should likely return something like: {"phoneNumber":"XXXXXXXXXX", reservationCode="YYYYYYYYYYYYY", validUntil ="<DATE>"}
**** SIM-service types
As the SIM-service types appear in a drop down menu, the options need to be provided by the back end
GET <HOST>/v1/simServiceTypes
Should likely return: {"simServiceOptions":[{"name":[{"name_en":"service name in English"},{"name_fa":"service name in Farsi"...}],,"id"="xxx"},...]}
--------------
**** Iranian Province, Town/City, Districts API
So API should likely work in a way that GET yields like this
GET <HOST>/v1/Province -> All the provinces
GET <HOST>/v1/Province/<PROVINCE>/TOWN_OR_CITY/ -> All the towns and cities in province
GET <HOST>/v1/Province/<PROVINCE>/TOWN_OR_CITY/<TOWN_OR_CITY>/DISTRICTS -> All the districts of the local communality
Each item returned by this locality API should likely have a structure such as:
{
                          "name": [{"en":"English name, such as Teheran"}, {"fa":"The name in farsi"} ...],
                          "id"="xxx"       
}
------------
**** Secure payment gateway/ APIs
Have to see how MTNI PG works
----------------
**** Ordering API
To make the application actually functional and not just fooling around in a browser orders API is required.
Ideally it allows us to push in our JSON datamodel's subscriptionPurchase and returns a JSON representing an order made with that data (so order id, status in system...) and 
if there was a problem with the order, it tells in the response what the problem was.
POST <HOST>/v1/orders
Should likely return: JSON payload of the order information, or a well designed error, with as full information as possible on what went wrong.
