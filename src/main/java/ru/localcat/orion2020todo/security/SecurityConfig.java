package ru.localcat.orion2020todo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.localcat.orion2020todo.constants.ApiConstants;
import ru.localcat.orion2020todo.helpers.PasswordHelper;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConfigurer jwtConfigurer;

    public SecurityConfig(JwtConfigurer jwtConfigurer) {
        this.jwtConfigurer = jwtConfigurer;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/",
                        "/static/**",
                        "/css/**",
                        "/files/**",
                        "/img/**",
                        "/js/**",
                        "/webfonts/**").permitAll()
                .antMatchers("/client/**",
                        "/api/**",
                        "/features/**",
                        "/contact/**"
                ).permitAll()
                .antMatchers(ApiConstants.VERSION1_PATH + "/auth").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .apply(jwtConfigurer);
        http.cors();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    protected PasswordEncoder passwordEncoder() {
        return PasswordHelper.getPasswordEncoder();
    }
}
