package com.niceadmin.dto.response;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class RolprogramaResponse implements Serializable {

    public Long id;
    private Long programaId;

    private boolean canCreate;
    private boolean canUpdate;
    private boolean canDelete;

}
