package com.auth.sample.web.controller.v1;

import com.auth.sample.web.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.auth.sample.web.MdcFilter.MDC_KEY;

@RestController
@CrossOrigin
@RequestMapping(path = "auth")
@Slf4j
public class AuthRestController {

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Boolean> login(@RequestBody UserDto inputUser) {
        System.out.println(inputUser.getUsername());
        System.out.println(inputUser.getPassword());
        return ResponseEntity.ok(true);
    }

}
