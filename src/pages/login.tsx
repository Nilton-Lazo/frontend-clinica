import React, { useState } from "react";

interface LoginProps {
  logo?: string;
  ilustracion?: string;
  nombreClinica?: string;
}

const Login: React.FC<LoginProps> = ({
  logo,
  ilustracion,
  nombreClinica = "Clínica Salud Integral",
}) => {
  const [formValues, setFormValues] = useState({ usuario: "", contrasena: "" });
  const [errors, setErrors] = useState({ usuario: "", contrasena: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const trimmedValues = {
      usuario: formValues.usuario.trim(),
      contrasena: formValues.contrasena.trim(),
    };
  
    const nextErrors = {
      usuario: trimmedValues.usuario ? "" : "El usuario es obligatorio.",
      contrasena: trimmedValues.contrasena ? "" : "La contraseña es obligatoria.",
    };
  
    setErrors(nextErrors);
  
    if (nextErrors.usuario || nextErrors.contrasena) {
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trimmedValues),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Error al iniciar sesión");
        return;
      }
  
      const data = await response.json();
      alert("Bienvenido " + data.usuario.nombre);
  
      // Redirigir según el nivel
      if (data.usuario.nivel === "admin") {
        window.location.href = "/dashboard-admin";
      } else {
        window.location.href = "/inicio";
      }
  
    } catch (error) {
      alert("Error de conexión con el servidor");
      console.error(error);
    }
  };
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 relative">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* Logo */}
        {logo && (
          <div className="col-span-1 md:col-span-2 flex justify-center items-center p-10 pb-0 bg-white">
            <img
              src={logo}
              alt="Logo clínica"
              className="w-40 object-contain"
            />
          </div>
        )}

        {/* Columna izquierda */}
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50">
          {ilustracion && (
            <img
              src={ilustracion}
              alt="Ilustración médica"
              className="w-full mb-6 object-contain"
            />
          )}
          <h1 className="text-2xl font-bold text-blue-900 text-center">
            {nombreClinica.toUpperCase()}
          </h1>
          <p className="mt-4 text-gray-600 text-center max-w-sm">
            Bienvenido al Sistema de Gestión Clínica.  
            Accede con tu cuenta para continuar según tu rol asignado.
          </p>
        </div>

        {/* Columna derecha (formulario) */}
        <div className="flex flex-col justify-center p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">
            Iniciar sesión
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label
                htmlFor="usuario"
                className="block text-sm font-medium text-gray-700"
              >
                Usuario o correo
              </label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={formValues.usuario}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Escribe tu usuario o correo"
                autoComplete="username"
                aria-invalid={!!errors.usuario}
                aria-describedby={errors.usuario ? "usuario-error" : undefined}
              />
              {errors.usuario && (
                <p id="usuario-error" className="mt-1 text-sm text-red-600">
                  {errors.usuario}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="contrasena"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                value={formValues.contrasena}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••••"
                autoComplete="current-password"
                aria-invalid={!!errors.contrasena}
                aria-describedby={errors.contrasena ? "contrasena-error" : undefined}
              />
              {errors.contrasena && (
                <p id="contrasena-error" className="mt-1 text-sm text-red-600">
                  {errors.contrasena}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-900 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition"
            >
              Ingresar
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <a href="#" className="text-blue-900">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-xs text-gray-500 text-center w-full">
        © 2025 {nombreClinica} - Todos los derechos reservados | Soporte
      </footer>
    </div>
  );
};

export default Login;
