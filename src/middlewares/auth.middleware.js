// // auth.middleware.js

// export const authorizeRole = (roles) => {
//     return (req, res, next) => {
//       const userRole = req.user?.role;
  
//       if (!userRole || !roles.includes(userRole)) {
//         return res.status(403).json({ message: 'No tienes permisos para realizar esta acción.' });
//       }
  
//       next();
//     };
//   };
  

  
//   export const ensureAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated && req.isAuthenticated()) {
//       return next();
//     }
  
//     return res.status(401).json({ message: 'Debes estar autenticado para acceder a esta ruta.' });
//   };


export const authorizeRole = (roles) => {
    return (req, res, next) => {
        next();
    };
};

export const ensureAuthenticated = (req, res, next) => {
    next();
};
