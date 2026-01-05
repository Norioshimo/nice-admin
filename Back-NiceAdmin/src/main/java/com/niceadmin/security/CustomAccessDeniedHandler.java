package com.niceadmin.security;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.niceadmin.dto.response.ApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper;

    public CustomAccessDeniedHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void handle(
            HttpServletRequest request,
            HttpServletResponse response,
            AccessDeniedException accessDeniedException
    ) throws IOException, ServletException {

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ApiResponse<Object> apiResponse =
                new ApiResponse<>(403, "No tienes permisos para acceder a este recurso", null);

        String json = objectMapper.writeValueAsString(apiResponse);
        response.getWriter().write(json);
    }


    public ObjectMapper crearObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        // Registrar módulo para LocalDateTime, LocalDate, Instant, etc.
        mapper.registerModule(new JavaTimeModule());
        // Deshabilitar timestamps para que se muestre ISO-8601
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return mapper;
    }
}