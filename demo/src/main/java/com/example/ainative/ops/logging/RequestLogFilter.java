package com.example.ainative.ops.logging;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class RequestLogFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RequestLogFilter.class);

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        var start = System.currentTimeMillis();
        filterChain.doFilter(request, response);
        var duration = System.currentTimeMillis() - start;

        log.info(
            "request method={} uri={} status={} durationMs={}",
            request.getMethod(),
            request.getRequestURI(),
            response.getStatus(),
            duration
        );
    }
}
