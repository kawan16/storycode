package com.javacodegeeks.snippets.enterprise;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;


// UC1 @T Say Hello
// UC2 @T Say Good Bye

@Controller
@RequestMapping("/helloworld/")
public class HelloWorldController extends MultiActionController {

    /*
        UC1 @S1 The server controller handles the Hello Request
        and returns the related view html
    */
	@RequestMapping("hello.htm")
	public ModelAndView hello(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		ModelAndView model = new ModelAndView("helloWorld");
		model.addObject("msg", "hello()");
		return model;
	}

    /*
        UC2 @S1 The server controller handles the Good Bye Request
        and returns the related view html
    */
	@RequestMapping("goodBye.htm")
	public ModelAndView goodBye(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		ModelAndView model = new ModelAndView("helloWorld");
		model.addObject("msg", "goodBye()");
		return model;
	}

}