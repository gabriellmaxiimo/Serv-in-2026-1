interface JwtPayload {
  sub?: string;
}

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

const decodeJwt = <T,>(token: string): T => {
  const payload = token.split(".")[1];

  if (!payload) {
    throw new Error("Token JWT inválido");
  }

  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const json = atob(padded);

  return JSON.parse(json) as T;
};

export const getUsuarioLogado = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = decodeJwt<CustomJwtPayload>(token);

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
