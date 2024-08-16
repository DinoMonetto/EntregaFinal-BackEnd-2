// // auth.middleware.js

// export const authorizeRole = (roles) => {
//     return (req, res, next) => {
//       // Supongamos que req.user contiene los datos del usuario autenticado, incluyendo su rol
//       const userRole = req.user?.role;
  
//       if (!userRole || !roles.includes(userRole)) {
//         return res.status(403).json({ message: 'No tienes permisos para realizar esta acción.' });
//       }
  
//       // Si el rol del usuario está permitido, continúa con la siguiente función middleware o la ruta
//       next();
//     };
//   };
  

  
//   export const ensureAuthenticated = (req, res, next) => {
//     // Verifica si el usuario está autenticado, por ejemplo, si req.user existe
//     if (req.isAuthenticated && req.isAuthenticated()) {
//       return next();
//     }
  
//     // Si no está autenticado, redirige o responde con un error
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
