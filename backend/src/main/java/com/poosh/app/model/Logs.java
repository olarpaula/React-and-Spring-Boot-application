package com.poosh.app.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Logs {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long userId;

    private String loggedIn;

    private String loggedOut;

//    @ManyToOne
//    @JoinColumn(name="log_id", nullable=false)
//    private LogsActivity logsActivity;

}
