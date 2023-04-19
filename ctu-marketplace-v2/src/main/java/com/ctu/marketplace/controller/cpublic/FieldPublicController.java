package com.ctu.marketplace.controller.cpublic;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.controller.common.FieldCommonController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(BaseURL.PUBLIC + "/fields")
public class FieldPublicController extends FieldCommonController {

}
