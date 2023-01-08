package com.auth.sample.web;

import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.UUID;

/**
 * Фильтр учёта сквозного идентификатора запроса, MDC.
 * Принимает HTTP-заголовок "transaction.id"
 */
@Component
public class MdcFilter implements Filter {

    public static final String MDC_KEY = "transaction.id";

    @Override
    public void doFilter(final ServletRequest request,
                         final ServletResponse response,
                         final FilterChain chain) throws IOException, ServletException {
        var httpRequest = (HttpServletRequest) request;
        var id = httpRequest.getHeader(MDC_KEY);
        if (id == null || id.isBlank()) {
            id = UUID.randomUUID().toString();
        }
        MDC.put(MDC_KEY, id);
        try {
            chain.doFilter(request, response);
        } finally {
            MDC.clear();
        }
    }
}