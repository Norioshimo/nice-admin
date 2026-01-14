package com.niceadmin.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(of = {"rolprogramaid"})
public class RolprogramaRequest {

    private Long id;

    @NotNull(message = "Id de programa es requerido.")
    @NotBlank(message = "Id de programa es requerido.")
    private Long programaId;

    private boolean canCreate;
    private boolean canUpdate;
    private boolean canDelete;

}
