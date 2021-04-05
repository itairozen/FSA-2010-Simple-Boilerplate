const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, "../public");
const DIST_PATH = path.join(__dirname, "../dist");

app.use(express.json());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/api/campuses", async (req, res, next) => {
  try {
    res.send(await Campus.findAll({}));
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/campuses", async (req, res, next) => {
  try {
    res.status(201).send(await Campus.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/campuses/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id, {
      include: [
        {
          model: Student,
        },
      ],
    });
    res.send(campus);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/campuses/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    await campus.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.get("/api/students", async (req, res, next) => {
  try {
    res.send(await Student.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/students/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [
        {
          model: Campus,
        },
      ],
    });
    res.send(student);
  } catch (err) {
    next(err);
  }
});

app.post("/api/students", async (req, res, next) => {
  try {
    res.status(201).send(await Student.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/students/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

const Sequelize = require("sequelize");
const { STRING, TEXT, DECIMAL } = Sequelize;
const faker = require("faker");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/JPFP"
);

const init = async () => {
  try {
    await db.authenticate();
    await syncAndSeed();
  } catch (ex) {
    console.log(ex);
  }
};

const Campus = db.define("campus", {
  name: {
    type: STRING,
    allowNull: false,
    notEmpty: true,
  },

  address: {
    type: STRING,
    // allowNull: false,
    notEmpty: true,
  },

  description: {
    type: TEXT,
  },

  imageURL: {
    type: TEXT,
    defalutValue: "NoImage",
  },
});

const Student = db.define("student", {
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    unique: true,
    // allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  imageURL: {
    type: TEXT,
    defaluValue:
      "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg",
  },
  gpa: {
    type: DECIMAL(2, 1),
  },
});

Student.belongsTo(Campus);
Campus.hasMany(Student, { as: "campusId" });

const syncAndSeed = async () => {
  await db.sync({ force: true });

  await Promise.all([
    Campus.create({
      name: "NYC",
      address: faker.address.streetAddress(),
      description: faker.lorem.paragraphs(1),
      imageURL:
        "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg",
    }),
    Campus.create({
      name: "CHICAGO",
      address: faker.address.streetAddress(),
      description: faker.lorem.paragraphs(1),
      imageURL:
        "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg",
    }),
    Campus.create({
      name: "AUSTIN",
      address: faker.address.streetAddress(),
      description: faker.lorem.paragraphs(1),
      imageURL:
        "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg",
    }),
    Campus.create({
      name: "LA",
      address: faker.address.streetAddress(),
      description: faker.lorem.paragraphs(1),
      imageURL:
        "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg",
    }),
    Campus.create({
      name: "SEATTLE",
      address: faker.address.streetAddress(),
      description: faker.lorem.paragraphs(1),
      imageURL:
        "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg",
    }),
  ]);

  await Promise.all([
    Student.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      gpa: faker.random.number({ min: 0, max: 4, precision: 0.01 }),
      imageURL:
        "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg",
      campusId: 1,
    }),
    Student.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      gpa: faker.random.number({ min: 0, max: 4, precision: 0.01 }),
      imageURL:
        "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg",
      campusId: 1,
    }),
    Student.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      gpa: faker.random.number({ min: 0, max: 4, precision: 0.01 }),
      imageURL:
        "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg",
      campusId: 2,
    }),
    Student.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      gpa: faker.random.number({ min: 0, max: 4, precision: 0.01 }),
      campusId: 3,
      imageURL:
        "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg",
    }),
    Student.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      gpa: faker.random.number({ min: 0, max: 4, precision: 0.01 }),

      imageURL:
        "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg",
    }),
  ]);
};

init();
