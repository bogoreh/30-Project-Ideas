package com.gmail.merikbest2015.twitterspringreactjs.repository.projection;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserPrincipalProjection {
    private Long id;
    private String email;
    private String password;
    private String activationCode;
}
