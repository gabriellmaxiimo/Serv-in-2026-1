import { jwtDecode, type JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

export const getUsuarioLogado = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);

    return {
      cpf: decoded.sub,
      role: decoded.role,
    };
  } catch (error) {
    console.error("Token inválido ou corrompido", error);
    return null;
  }
};

export const isAdmin = () => {
  const usuario = getUsuarioLogado();
  return usuario?.role === "ADMIN";
};
