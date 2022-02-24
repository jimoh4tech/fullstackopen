const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const max = Math.max(...likes)
    const blog = blogs.find(blog => blog.likes === max)
    return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}