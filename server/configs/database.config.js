const mongoose = require("mongoose")
const configs = require("./index")
const chalk = require("chalk")

const DATABASE_URI = configs.DATABASE_URI

const { nanoid } = require("nanoid")

function mongooseNanoidPlugin(schema) {
  if (!schema.options._id) return

  const length = 30

  let _id = "_id"
  const dataObj = {}

  dataObj[_id] = {
    type: String,
    default: function () {
      return nanoid(length)
    },
  }

  schema.add(dataObj)
  schema.pre("save", function (next) {
    if (this.isNew && !this.constructor.$isArraySubdocument) {
      attemptToGenerate(this, length)
        .then(function (newId) {
          this[_id] = newId
          next()
        })
        .catch(next)
    } else next()
  })
}

function attemptToGenerate(doc, length) {
  const id = nanoid(length)
  return doc.constructor.findById(id).then(function (found) {
    if (found) return attemptToGenerate(doc, length)
    return id
  })
}

mongoose.plugin(mongooseNanoidPlugin)

mongoose
  .connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(chalk.blue("Database connected.")))
  .catch(() => console.log(chalk.red("Error connected")))
