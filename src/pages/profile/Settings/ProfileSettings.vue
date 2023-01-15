<template lang="pug">

.settings-page: .container.page: .row: .col-md-6.offset-md-3.col-xs-12
    h1.text-xs-center Your Settings
    common-errors-list(
        :errors="errors"
    )
    form
        fieldset(
            :disabled="isLoading"
        )
            fieldset.form-group
                input.form-control(
                    v-model="image"
                    type="text"
                    placeholder="URL of profile picture"
                )
            fieldset.form-group
                input(
                    v-model="username"
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    required="true"
                )
            fieldset.form-group
                textarea.form-control.form-control-lg(
                    v-model="bio"
                    rows="8"
                    placeholder="Short bio about you"
                )
            fieldset.form-group
                input.form-control.form-control-lg(
                    v-model="email"
                    type="email"
                    placeholder="Email"
                    required="true"
                )
            fieldset.form-group
                input.form-control.form-control-lg(
                    v-model="password"
                    type="password"
                    placeholder="New password"
                )
            common-loader(
                v-if="isLoading"
                :size="5"
            )
            button.btn.btn-lg.btn-primary.pull-xs-right(
                v-else=""
                @click="updateSettings"
            ) Update Settings
    hr
    button.btn.btn-outline-danger(
        @click="logout"
    ) Or click here to logout.

</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"

import { ErrorList, Loader } from "@/shared/ui"

import { userModel } from "@/entities/user"

import { ICurrentUser } from "@/store/models"
import { isArrayOfStrings } from "@/utils/ArrayUtils"

@Component({
    components: {
        "common-loader": Loader,
        "common-errors-list": ErrorList,
    },
})
export default class ProfileSettings extends Vue {
    isLoading = false

    image: string | null = null
    bio = ""
    email = ""
    password: string | null = null
    username = ""
    errors?: string[] = []

    User = userModel.useUserModule(this.$store)

    get hasErrors(): boolean {
        return !!this.errors?.length
    }

    get currentUser(): Partial<ICurrentUser> {
        return this.User.currentUser || {}
    }

    logout(): void {
        this.User.logout()
        this.$router.push({ name: this.$routesNames.home })
    }

    async updateSettings(): Promise<void> {
        this.errors = []

        this.isLoading = true
        try {
            await this.User.update({
                email: this.email,
                password: this.password,
                bio: this.bio,
                image: this.image,
                username: this.username,
            })
            this.$router.push({ name: this.$routesNames.home })
        } catch (e) {
            if (isArrayOfStrings(e)) {
                this.errors = e as string[]
            } else {
                throw e
            }
        } finally {
            this.isLoading = false
        }
    }
    @Watch("currentUser", { immediate: true })
    onCurrentUserLoaded(newValue: ICurrentUser): void {
        this.errors = []
        if (newValue) {
            this.image = newValue.image
            this.bio = newValue.bio
            this.email = newValue.email
            this.username = newValue.username
        }
    }
}
</script>
