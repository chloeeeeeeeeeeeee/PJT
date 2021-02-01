package com.ssafy.bab.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.common.base.Predicate;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class Swagger2Config {
	
//	http://localhost:[port번호]/swagger-ui.html

	private String version = "V1";
	private String title = "SSAFY VUEJS API " + version;
	
	@Bean
	public Docket api() {
		List<ResponseMessage> responseMessages = new ArrayList<ResponseMessage>();
		responseMessages.add(new ResponseMessageBuilder().code(200).message("OK !!!").build());
		responseMessages.add(new ResponseMessageBuilder().code(500).message("서버 문제 발생 !!!").responseModel(new ModelRef("Error")).build());
		responseMessages.add(new ResponseMessageBuilder().code(404).message("페이지를 찾을 수 없습니다 !!!").build());
		return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).groupName(version).select()
					.apis(RequestHandlerSelectors.basePackage("com.ssafy.bab.controller"))	// controller package 안에있는 url 리스트를 추출
					.paths(postPaths()).build()												// 추출한 url리스트에서 모든 url을 노출
					.useDefaultResponseMessages(false)
					.globalResponseMessage(RequestMethod.GET,responseMessages);
	}
	
	private Predicate<String> postPaths() {
		return PathSelectors.any();
//		return or(regex("/user/.*"), regex("/article/.*"), regex("/memo/.*"));
//		return regex("/admin/.*");
		
//		return PathSelectors.ant("/article/.*") 추출한 url 리스트에서 /article/path인 url만 노출
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title(title).version("1.0").build();

	}
	
	
}


