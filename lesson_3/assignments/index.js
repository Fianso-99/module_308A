// ===============================
// FAKE DATABASES (Simulation)
// ===============================

// Simulate delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// CENTRAL DATABASE
async function central(id) {
  await delay(100);

  if (id < 1 || id > 10) {
    throw "User not found in central database";
  }

  const databases = ["db1", "db2", "db3"];
  return databases[id % 3]; // distributes users
}

// BASIC DATABASES
async function db1(id) {
  await delay(100);
  return {
    username: `user${id}`,
    website: `www.user${id}.com`,
    company: {
      name: "Company A",
      catchPhrase: "Innovation first",
      bs: "business solutions"
    }
  };
}

async function db2(id) {
  await delay(100);
  return {
    username: `member${id}`,
    website: `www.member${id}.org`,
    company: {
      name: "Company B",
      catchPhrase: "Quality matters",
      bs: "corporate growth"
    }
  };
}

async function db3(id) {
  await delay(100);
  return {
    username: `client${id}`,
    website: `www.client${id}.net`,
    company: {
      name: "Company C",
      catchPhrase: "Future ready",
      bs: "tech services"
    }
  };
}

const dbs = { db1, db2, db3 };

// VAULT DATABASE
async function vault(id) {
  await delay(100);

  return {
    name: `User ${id}`,
    email: `user${id}@mail.com`,
    address: {
      street: "Main St",
      suite: "Apt 1",
      city: "New York",
      zipcode: "10001",
      geo: {
        lat: "40.7128",
        lng: "-74.0060"
      }
    },
    phone: "123-456-7890"
  };
}

// ===============================
// MAIN FUNCTION (YOUR TASK)
// ===============================

async function getUserData(id) {
  if (typeof id !== "number" || id < 1 || id > 10) {
    return Promise.reject("Invalid ID");
  }

  try {
    const dbName = await central(id);

    const [basicInfo, personalInfo] = await Promise.all([
      dbs[dbName](id),
      vault(id)
    ]);

    return {
      id: id,
      name: personalInfo.name,
      username: basicInfo.username,
      email: personalInfo.email,
      address: personalInfo.address,
      phone: personalInfo.phone,
      website: basicInfo.website,
      company: basicInfo.company
    };

  } catch (error) {
    return Promise.reject(`Database error: ${error}`);
  }
}

// ===============================
// TESTING
// ===============================

console.time("Execution Time");

getUserData(5)
  .then(data => {
    console.log("User Data:", data);
  })
  .catch(error => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.timeEnd("Execution Time");
  });

// Try these too:
// getUserData(20);
// getUserData("hello");
