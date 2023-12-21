// authenticate user endpoint
export const authenticateUser = async (req, res, next) => {
  if (req.session.username === undefined) {
    console.log("[unauthorize user] redirecting to /login")
    return res.redirect("/login")
  }
  return next()
}