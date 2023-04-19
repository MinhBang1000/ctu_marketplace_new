package com.ctu.marketplace.controller.researcher;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.controller.common.FieldCommonController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(BaseURL.RESEARCHER + "/fields")
public class FieldResearcherController extends FieldCommonController {

}
