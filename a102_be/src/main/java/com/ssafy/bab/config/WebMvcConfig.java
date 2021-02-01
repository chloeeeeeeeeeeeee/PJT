package com.ssafy.bab.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
	@Value("${resources.location}")
	private String resourcesLocation;
	
	@Value("${resources.uri_path}")
	private String resourcesUriPath;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler(resourcesUriPath)
        .addResourceLocations(resourcesLocation);
	}

}
