// * CanMatch se encarga de decidir si una ruta debe cargarse.
// export const authGuard: CanMatchFn = (
//   route,
//   segments,
// ): MaybeAsync<GuardResult> => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   //* Verifica si `user` existe
//   return authService.user ? !authService.user : router.createUrlTree(['/auth']);
// };
