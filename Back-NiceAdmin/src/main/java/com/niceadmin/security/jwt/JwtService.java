package com.niceadmin.security.jwt;

import com.niceadmin.entity.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    @Autowired
    private JwtProperties props;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(props.getSecret().getBytes(StandardCharsets.UTF_8));
    }

    public String generarToken(Usuario usuario) {
        return Jwts.builder()
                .setSubject(usuario.getUsuario())
                .claim("userId", usuario.getId())
                .claim("rolId", usuario.getRolId().getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + props.getExpiration()))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    public Long extrarUserId(String token) {
        return extraerClaims(token).get("userId", Long.class);
    }

    public Long extrarRolId(String token) {
        return extraerClaims(token).get("rolId", Long.class);
    }

    public String extraerUsername(String token) {
        return extraerClaims(token).getSubject();
    }

    public boolean esTokenValido(String token, Usuario usuario) {
        final String username = extraerUsername(token);
        return username.equals(usuario.getUsuario())
                && !estaExpirado(token);
    }

    private boolean estaExpirado(String token) {
        return extraerClaims(token)
                .getExpiration()
                .before(new Date());
    }

    private Claims extraerClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}