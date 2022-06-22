require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  author: {
    type: DataTypes.STRING(1024)
  },
  url: {
    type: DataTypes.STRING(1024),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(1024),
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

Blog.sync()  // Creates the table if it doesn't exist (and does nothing if it already exists)

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    console.log(JSON.stringify(blog, null, 2))
    res.json(blog)
  } catch (error) {
    res.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  await Blog.destroy({ where: { id: req.params.id } })
  res.status(204).end()
});

const PORT = process.env.port || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})