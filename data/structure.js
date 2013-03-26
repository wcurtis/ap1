
/**
 * This is an example object for resource.structure which defines how the entity should be built.
 * 
 * Eg. http://ap1.io/customer
 */ 
{
  "name": {
    "type": "fullname"  // 'type' defines what kind of random value gets generated here. There are many.
  },
  "email": {
    "type": "email"
  },
  "address": {
    "type" : "address"  // The 'address' type actually creates a random address object with many other fields like city, state, etc
  },
  "phone": [
    {
      "type": "phone",
      "count": 2        // When within an array, this populates the phone field with two numbers
    }
  ],
  "created_at": {
    "type": "timestamp",
    "min": "2000-01-01",  // Generate timestamp between min and max dates
    "max": "2013-01-01"   // Ommit max for present day
  }
}

/**
 * Shopify customer example
 * 
 * {
 *   "customer": {
 *     "accepts_marketing": false,
 *     "created_at": "2013-03-04T15:32:32-05:00",
 *     "email": "bob.norman@hostmail.com",
 *     "first_name": "Bob",
 *     "id": 207119551,
 *     "last_name": "Norman",
 *     "last_order_id": null,
 *     "note": null,
 *     "orders_count": 0,
 *     "state": "disabled",
 *     "total_spent": "0.00",
 *     "updated_at": "2013-03-04T15:32:32-05:00",
 *     "tags": "",
 *     "last_order_name": null,
 *     "addresses": [
 *       {
 *         "address1": "Chestnut Street 92",
 *         "address2": "",
 *         "city": "Louisville",
 *         "company": null,
 *         "country": "US",
 *         "first_name": null,
 *         "id": 207119551,
 *         "last_name": null,
 *         "phone": "555-625-1199",
 *         "province": "KY",
 *         "zip": "40202",
 *         "name": null,
 *         "province_code": null,
 *         "country_code": null,
 *         "default": true
 *       }
 *     ]
 *   }
 * }
 */
{
  "customer": {
    "type": "object", // This is treated like an embedded object, and the builder recursed on its children
    "children": {
      "accepts_marketing": {
        "type": "boolean"
      },
      "created_at": {
        "type": "timestamp",  // TODO: Figure out how to specify different formats of timestamps
        "min": "2008-01-01",  // The year the shop opened
        "max": "2013-03-25"   // Last signup date, or omit this field for present day
      },
      "email": {
        "type": "email"
      },
      "first_name": {
        "type": "firstName"
      },
      "id": {
        "type": "id",         // TODO: need to distinguish between all kinds of ids: eg. 123, B0014543HFK82, uuid, etc
        "min": "200000000",
        "max": "300000000"
      },
      "last_name": {
        "type": "lastName"
      },
      "last_order_id": {
        "type": "null"        // TODO: In this case, we may want some of these to be null, so support for is_null and how often is important        
      },                      // TODO: need to define foreign key constraints
      "note": {
        "type": "multiple",   // 'multiple' type has children, which define many types this field could be
        "children": [
          {
            "type": "null",
            "ratio": "20"     // Ratio is used when inside a 'multiple' type to determine probability of which child gets generated. Maybe we also implement 'probability' as a decimal.
          },
          {
            "type": "ipsum",  // 'ipsum' is basically random text, could be more specific down the line like 'comment', 'review', etc
            "length": 50,
            "ratio": "1"
          }
        ]
      },
      "orders_count": {       // TODO: This value is determined by a different resource (orders). Need to find a way to reference that.
        "type": "int",
        "min": 0,
        "max": 10
      },
      "state": {
        "type": "string",
        "set": [              // 'set' contains the options this field can be, they are chosen at random
          "disabled",
          "enabled"
        ]
      },
      "total_spent": {
        "type": "currency",   // 'currency' extends 'float' and specifies two decimal places
        "cast": "string",     // TODO: still uneasy about this one, but the idea is this is a string value, but of a float
        "min": 0,
        "max": 1000
      },
      "updated_at": {
        "type": "timestamp",
        "min": "2008-01-01"   // TODO: This value shouldn't be less than 'created_at'. Need to support inter field dependencies lol, crazy.
      },
      "tags": {               // TODO: not sure what this field should be in shopify yet
        "type": "string",
        "length": 0
      },
      "last_order_name": {    // TODO: Also have to find out what this could be other than null
        "type": "null"
      },
      "addresses": {
        "type": "array",
        "children": {
          "type": "shopifyAddress",
          "count": 2                  // Defines the number of elements to be generated in this array (can also specify 'min' and 'max')
        }
      }
    }
  }
}

/**
 * Field type 'shopifyAddress'
 */
{
  "type": "object",
  "children": {                 // TODO: Does this make sense to be an object?
    "address1": {
      "type": "streetAddress"
    },
    "address2": {
      "type": "string",
      "length": 0
    },
    "city": {
      "type": "city",           // TODO: This depends on 'country', again inter field dependencies. I wonder if we can just reformat the address for this
      "in": "@this.province"    // Cool idea for field dependencies
    },
    "company": {
      "type": "company"         // Extends 'string', generates random business names
    },
    "country": {
      "type": "country",
      "set": [
        "Canada",               // This store only sells to North America
        "USA",
        "Mexico"
      ]
    },
    "first_name": {
      "type": "=this.first_name"    // TODO: This is tricky because this is a child type, which may not have the same parent structure
    },                              // TODO: But I like the '=' paradigm here :)
    "id": {
      "type": "id"                  // This may reference an order id in the future
    },
    "last_name" {
      "type": "=this.last_name"
    },
    "phone": {
      "type": "phone"               // TODO: Add option to specify phone country code/format
    },
    "province": {
      "type": "regionCode"          // This can be regionCode, alternatively we can have just region, then formated as its code.. not sure yet.
    },
    "zip": {
      "type": "zipcode"             // TODO: Somehow make this dependent on state/city
    },
    "name": {
      "type": "null"                // TODO: find out options for this
    },
    "province_code": {
      "type": "null"                // TODO: find out options for this
    },
    "country_code": {
      "type": "null"                // TODO: find out options for this
    },
    "default": {
      "type": "boolean"             // TODO: this should only be true for one in the parent array.. need a way to specify this
      "arrayOptions": {             // TODO: here's an idea for solvig the above problem of only one 'true' value
                                    // TODO: Figure out how this is gonna work
      }
    }
  }
}








